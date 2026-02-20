'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate personalized career recommendations
 * across multiple discovery layers for the CareerCraft 3D application.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { CAREER_PATHS } from '@/lib/career-data';

const RecommendationSchema = z.object({
  name: z.string().describe('The name of the recommended career path.'),
  description: z.string().describe('A brief and engaging description explaining why it aligns with the user\'s interests.'),
  alignmentScore: z.number().min(1).max(100).describe('A score from 1 to 100 indicating how well this career aligns with the user\'s interests.'),
  category: z.enum(['primary', 'alternative', 'cross-domain', 'hidden-gem']).describe('The strategic layer this recommendation belongs to.'),
});

const SmartCareerRecommendationInputSchema = z.object({
  userInterests: z.array(z.string()).describe('A list of strings representing the user\'s interests.'),
});
export type SmartCareerRecommendationInput = z.infer<typeof SmartCareerRecommendationInputSchema>;

const SmartCareerRecommendationOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('A tiered list of personalized career recommendations (aim for 12-15 total).'),
  isFallback: z.boolean().optional().describe('Indicates if this is fallback data.'),
});
export type SmartCareerRecommendationOutput = z.infer<typeof SmartCareerRecommendationOutputSchema>;

export async function smartCareerRecommendation(input: SmartCareerRecommendationInput): Promise<SmartCareerRecommendationOutput> {
  return smartCareerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartCareerRecommendationPrompt',
  input: { schema: SmartCareerRecommendationInputSchema },
  output: { schema: SmartCareerRecommendationOutputSchema },
  prompt: `You are a strategic career architect for CareerCraft 3D.
Your task is to generate an expansive list of 12-15 career recommendations based on the user's interests: {{{userInterests}}}.

Organize recommendations into these 4 layers:
1. PRIMARY: Top 3-5 absolute best fits.
2. ALTERNATIVE: 4-5 strong alternatives in related fields.
3. CROSS-DOMAIN: 3-4 paths that blend different interests (e.g., Tech + Art = UI/UX).
4. HIDDEN-GEM: 2-3 emerging or unique careers that match the user's vibe.

For each, provide a name, a compelling 'why this matches' description, and an alignment score.`,
});

const smartCareerRecommendationFlow = ai.defineFlow(
  {
    name: 'smartCareerRecommendationFlow',
    inputSchema: SmartCareerRecommendationInputSchema,
    outputSchema: SmartCareerRecommendationOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) throw new Error('No recommendations generated.');
      return { ...output, isFallback: false };
    } catch (error: any) {
      console.warn('AI API Error, providing rich simulated fallback:', error.message);
      
      const layers = [
        { cat: 'primary', count: 3, scoreRange: [90, 98] },
        { cat: 'alternative', count: 4, scoreRange: [80, 89] },
        { cat: 'cross-domain', count: 3, scoreRange: [75, 85] },
        { cat: 'hidden-gem', count: 2, scoreRange: [70, 80] }
      ];

      const fallbacks: any[] = [];
      let pathIdx = 0;
      
      layers.forEach(layer => {
        for(let i=0; i < layer.count; i++) {
          const path = CAREER_PATHS[pathIdx % CAREER_PATHS.length];
          fallbacks.push({
            name: path.name,
            description: `Based on your curiosity in ${input.userInterests.slice(0, 2).join(' and ')}, this path offers a perfect blend of challenge and growth.`,
            alignmentScore: layer.scoreRange[0] + Math.floor(Math.random() * (layer.scoreRange[1] - layer.scoreRange[0])),
            category: layer.cat
          });
          pathIdx++;
        }
      });

      return { recommendations: fallbacks, isFallback: true };
    }
  }
);
