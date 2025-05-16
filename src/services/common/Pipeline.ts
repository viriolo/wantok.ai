
/**
 * Generic Pipeline Pattern Implementation
 * Allows composing multiple processing steps that can be executed in sequence.
 */

/**
 * Interface for a single pipeline step
 */
export interface PipelineStep<T> {
  execute: (data: T) => Promise<T> | T;
}

/**
 * Pipeline class that manages a sequence of processing steps
 */
export class Pipeline<T> {
  private steps: PipelineStep<T>[] = [];

  /**
   * Add a processing step to the pipeline
   * @param step The step to add
   * @returns The pipeline instance for chaining
   */
  addStep(step: PipelineStep<T>): Pipeline<T> {
    this.steps.push(step);
    return this;
  }

  /**
   * Add multiple processing steps to the pipeline
   * @param steps Array of steps to add
   * @returns The pipeline instance for chaining
   */
  addSteps(steps: PipelineStep<T>[]): Pipeline<T> {
    this.steps.push(...steps);
    return this;
  }

  /**
   * Process the data through all pipeline steps
   * @param initialData The initial data to process
   * @returns The processed data after going through all steps
   */
  async process(initialData: T): Promise<T> {
    let result = initialData;
    
    for (const step of this.steps) {
      result = await Promise.resolve(step.execute(result));
    }
    
    return result;
  }

  /**
   * Create a new pipeline with the same steps
   * @returns A new pipeline instance with the same steps
   */
  clone(): Pipeline<T> {
    const newPipeline = new Pipeline<T>();
    newPipeline.steps = [...this.steps];
    return newPipeline;
  }
}

/**
 * Create a simple pipeline step from a function
 * @param fn Function to execute as a pipeline step
 * @returns A pipeline step object
 */
export function createStep<T>(fn: (data: T) => Promise<T> | T): PipelineStep<T> {
  return {
    execute: fn
  };
}
