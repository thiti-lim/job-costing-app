import { CustomerService } from './../customer/customer.service';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { DirectLaborCost } from '../models/direct-labor-cost.model';
import { DirectMaterialCost } from '../models/direct-material-cost.model';
import { Job } from '../models/job.model';
import { Labor } from '../models/labor.model';
import { Material } from '../models/material.model';
import { JobStatus } from '../models/enums/job-status.enum';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobs: Job[] = [];

  constructor(private customerService: CustomerService) {
    this.createMockJobs();
  }

  getJobs(): Job[] {
    return this.jobs;
  }

  getJobById(id: number): Job | undefined {
    return this.jobs.find((job) => job.id === id);
  }
  getDirectMaterialCosts(
    jobId: number,
    materialId: number
  ): DirectMaterialCost[] {
    const job = this.getJobById(jobId);
    if (job) {
      const material = job.materials.find((mat) => mat.id === materialId);
      if (material) {
        return material.directMaterialCosts;
      }
    }
    return [];
  }

  getDirectLaborCosts(jobId: number, laborId: number): DirectLaborCost[] {
    const job = this.getJobById(jobId);
    if (job) {
      const labor = job.labors.find((lab) => lab.id === laborId);
      if (labor) {
        return labor.directLaborCosts;
      }
    }
    return [];
  }

  removeDirectMaterialCost(
    jobId: number,
    materialId: number,
    directMaterialCostId: number
  ): void {
    const job = this.getJobById(jobId);
    if (job) {
      const material = job.materials.find((mat) => mat.id === materialId);
      if (material) {
        const directMaterialCostIndex = material.directMaterialCosts.findIndex(
          (cost) => cost.id === directMaterialCostId
        );
        if (directMaterialCostIndex > -1) {
          material.directMaterialCosts.splice(directMaterialCostIndex, 1);
        }
      }
    }
  }

  removeDirectLaborCost(
    jobId: number,
    laborId: number,
    directLaborCostId: number
  ): void {
    const job = this.getJobById(jobId);
    if (job) {
      const labor = job.labors.find((lab) => lab.id === laborId);
      if (labor) {
        const directLaborCostIndex = labor.directLaborCosts.findIndex(
          (cost) => cost.id === directLaborCostId
        );
        if (directLaborCostIndex > -1) {
          labor.directLaborCosts.splice(directLaborCostIndex, 1);
        }
      }
    }
  }

  createMockJobs(): void {
    // Create jobs using mock data
    const job1 = new Job(
      1,
      'Job 1',
      this.customerService.getCustomerById(1)!,
      new Date(),
      new Date(),
      0.1,
      JobStatus.InProgress
    );
    const material1 = new Material(1, 'Wood', 220, 7000);
    const material2 = new Material(2, 'Material 2', 92, 600);
    job1.materials.push(material1, material2);
    const labor1 = new Labor(1, 'Labor 1', 10, 100);
    const labor2 = new Labor(2, 'Labor 2', 20, 200);
    job1.labors.push(labor1, labor2);

    const job2 = new Job(
      2,
      'Job 2',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.2,
      JobStatus.Completed
    );
    const material3 = new Material(3, 'Material 3', 30, 300);
    job2.materials.push(material3);
    const labor3 = new Labor(3, 'Labor 3', 30, 300);
    job2.labors.push(labor3);

    const job3 = new Job(
      3,
      'Job 3',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.15,
      JobStatus.InProgress
    );
    const material4 = new Material(4, 'Material 4', 40, 400);
    const material5 = new Material(5, 'Material 5', 50, 500);
    job3.materials.push(material4, material5);
    const labor4 = new Labor(4, 'Labor 4', 40, 400);
    const labor5 = new Labor(5, 'Labor 5', 50, 500);
    job3.labors.push(labor4, labor5);

    // Assign direct material costs to materials
    material1.directMaterialCosts.push(
      new DirectMaterialCost(
        1,
        'DM Wood Cost 1',
        10,
        10,
        'Seller 1',
        'WOOD-001',
        new Date()
      ),
      new DirectMaterialCost(
        2,
        'DM Wood Cost 2',
        20,
        15,
        'Seller 2',
        'WOOD-002',
        new Date()
      ),
      new DirectMaterialCost(
        3,
        'DM Wood Cost 3',
        15,
        8,
        'Seller 1',
        'WOOD-003',
        new Date()
      ),
      new DirectMaterialCost(
        4,
        'DM Wood Cost 4',
        25,
        12,
        'Seller 2',
        'WOOD-004',
        new Date()
      ),
      new DirectMaterialCost(
        5,
        'DM Wood Cost 5',
        18,
        9,
        'Seller 1',
        'WOOD-005',
        new Date()
      )
    );
    material2.directMaterialCosts.push(
      new DirectMaterialCost(
        2,
        'Direct Material Cost 2',
        20,
        15,
        'Seller 2',
        'DM-002',
        new Date()
      )
    );
    material3.directMaterialCosts.push(
      new DirectMaterialCost(
        3,
        'Direct Material Cost 3',
        15,
        8,
        'Seller 1',
        'DM-003',
        new Date()
      )
    );
    material4.directMaterialCosts.push(
      new DirectMaterialCost(
        4,
        'Direct Material Cost 4',
        20,
        10,
        'Seller 1',
        'DM-004',
        new Date()
      )
    );
    material5.directMaterialCosts.push(
      new DirectMaterialCost(
        5,
        'Direct Material Cost 5',
        30,
        15,
        'Seller 2',
        'DM-005',
        new Date()
      )
    );

    // Assign direct labor costs to labors
    labor1.directLaborCosts.push(
      new DirectLaborCost(1, 'Direct Labor Cost 1', 'DL-001', 12, 8, new Date())
    );
    labor2.directLaborCosts.push(
      new DirectLaborCost(
        2,
        'Direct Labor Cost 2',
        'DL-002',
        15,
        10,
        new Date()
      )
    );
    labor3.directLaborCosts.push(
      new DirectLaborCost(3, 'Direct Labor Cost 3', 'DL-003', 10, 6, new Date())
    );
    labor4.directLaborCosts.push(
      new DirectLaborCost(4, 'Direct Labor Cost 4', 'DL-004', 18, 8, new Date())
    );
    labor5.directLaborCosts.push(
      new DirectLaborCost(
        5,
        'Direct Labor Cost 5',
        'DL-005',
        20,
        12,
        new Date()
      )
    );

    // Push the created jobs to the jobs array
    this.jobs.push(job1, job2, job3);
  }
}
