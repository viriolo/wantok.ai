
import { Pipeline, createStep } from '../Pipeline';

describe('Pipeline', () => {
  it('should process steps in sequence', async () => {
    // Create a new pipeline
    const pipeline = new Pipeline<number>();
    
    // Add steps that increment the value
    pipeline.addStep(createStep(n => n + 1));
    pipeline.addStep(createStep(n => n + 2));
    pipeline.addStep(createStep(n => n * 2));
    
    // Process the data
    const result = await pipeline.process(1);
    
    // 1 + 1 = 2, 2 + 2 = 4, 4 * 2 = 8
    expect(result).toBe(8);
  });
  
  it('should handle async steps', async () => {
    const pipeline = new Pipeline<number>();
    
    pipeline.addStep(createStep(n => Promise.resolve(n + 1)));
    pipeline.addStep(createStep(async n => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 10));
      return n * 2;
    }));
    
    const result = await pipeline.process(5);
    expect(result).toBe(12); // (5 + 1) * 2 = 12
  });
  
  it('should handle empty pipeline', async () => {
    const pipeline = new Pipeline<string>();
    const result = await pipeline.process('test');
    expect(result).toBe('test');
  });
  
  it('should support chaining when adding steps', async () => {
    const pipeline = new Pipeline<number>()
      .addStep(createStep(n => n + 1))
      .addStep(createStep(n => n * 3));
      
    const result = await pipeline.process(2);
    expect(result).toBe(9); // (2 + 1) * 3 = 9
  });
  
  it('should allow adding multiple steps at once', async () => {
    const pipeline = new Pipeline<number>();
    
    const steps = [
      createStep<number>(n => n + 5),
      createStep<number>(n => n - 2)
    ];
    
    pipeline.addSteps(steps);
    const result = await pipeline.process(10);
    expect(result).toBe(13); // 10 + 5 - 2 = 13
  });
  
  it('should clone pipeline correctly', async () => {
    const original = new Pipeline<number>()
      .addStep(createStep(n => n * 2));
    
    const clone = original.clone();
    clone.addStep(createStep(n => n + 5));
    
    const originalResult = await original.process(3);
    const cloneResult = await clone.process(3);
    
    expect(originalResult).toBe(6); // 3 * 2 = 6
    expect(cloneResult).toBe(11); // 3 * 2 + 5 = 11
  });
});
