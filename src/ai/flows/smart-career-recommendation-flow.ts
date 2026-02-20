'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate personalized career recommendations
 * based on user interests for the CareerCraft 3D application.
 *
 * - smartCareerRecommendation - A function that handles the career recommendation process.
 * - SmartCareerRecommendationInput - The input type for the smartCareerRecommendation function.
 * - SmartCareerRecommendationOutput - The return type for the smartCareerRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmartCareerRecommendationInputSchema = z.object({
  userInterests: z
    .array(z.string())
    .describe('A list of strings representing the user\'s interests.'),
});
export type SmartCareerRecommendationInput = z.infer<
  typeof SmartCareerRecommendationInputSchema
>;

const SmartCareerRecommendationOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended career path.'),
        description:
          z.string().describe('A brief description of the career path and why it aligns with the user\'s interests.'),
        alignmentScore:
          z.number().min(1).max(100).describe('A score from 1 to 100 indicating how well this career aligns with the user\'s interests.'),
      })
    )
    .describe('A list of personalized career recommendations.'),
});
export type SmartCareerRecommendationOutput = z.infer<
  typeof SmartCareerRecommendationOutputSchema
>;

export async function smartCareerRecommendation(
  input: SmartCareerRecommendationInput
): Promise<SmartCareerRecommendationOutput> {
  return smartCareerRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartCareerRecommendationPrompt',
  input: { schema: SmartCareerRecommendationInputSchema },
  output: { schema: SmartCareerRecommendationOutputSchema },
  prompt: `You are a helpful and experienced career advisor for CareerCraft 3D.
Your task is to generate a list of personalized career recommendations based on the user's provided interests.
For each recommendation, you must provide a career path name, a brief and engaging description explaining why it aligns with the user's interests, and an alignment score from 1 to 100.

Aim to provide 3 to 5 diverse recommendations.

User Interests:
{{{userInterests}}}`,
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
      if (!output) {
        throw new Error('No career recommendations were generated.');
      }
      return output;
    } catch (error: any) {
      if (error.message?.includes('403') || error.message?.includes('disabled')) {
        throw new Error('API_DISABLED: The Generative Language API is not enabled. Please enable it in the Google Cloud Console.');
      }
      throw error;
    }
  }
);
