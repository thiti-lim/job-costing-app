import { DirectLaborCost } from 'src/app/models/direct-labor-cost.model';
import { CustomerService } from './../customer/customer.service';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
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
  getDirectMaterialCostList(
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

  getDirectLaborCostList(jobId: number, laborId: number): DirectLaborCost[] {
    const job = this.getJobById(jobId);
    if (job) {
      const labor = job.labors.find((lab) => lab.id === laborId);
      if (labor) {
        return labor.directLaborCosts;
      }
    }
    return [];
  }

  getDirectMaterialCost(
    jobId: number,
    materialId: number,
    directMaterialCostId: number
  ): DirectMaterialCost | undefined {
    const job = this.getJobById(jobId);
    if (job) {
      const material = job.materials.find((mat) => mat.id === materialId);
      if (material) {
        return material.directMaterialCosts.find(
          (cost) => cost.id === directMaterialCostId
        );
      }
    }
    return undefined;
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

  addJob(jobData: any): void {
    const jobId = this.getNextJobId();
    const customerId = jobData.customer.id;

    const customer = new Customer(
      customerId,
      jobData.customer.name,
      jobData.customer.location,
      jobData.customer.phoneNumber,
      jobData.customer.contact
    );

    const materials: Material[] = jobData.materials.map((materialData: any) => {
      const materialId = this.getNextMaterialId();
      return new Material(
        materialId,
        materialData.materialName,
        parseInt(materialData.estimatedUnits),
        parseInt(materialData.estimatedTotalCost)
      );
    });

    const labors: Labor[] = jobData.labors.map((laborData: any) => {
      const laborId = this.getNextLaborId();
      return new Labor(
        laborId,
        laborData.laborName,
        parseInt(laborData.estimatedHours),
        parseInt(laborData.estimatedTotalCost)
      );
    });

    const job = new Job(
      jobId,
      jobData.name,
      customer,
      new Date(jobData.startDate),
      new Date(jobData.finishDate),
      parseFloat(jobData.overheadRate),
      materials,
      labors,
      JobStatus.InProgress
    );

    job.materials = materials;
    job.labors = labors;

    this.jobs.push(job);
  }

  private getNextJobId(): number {
    const lastJob = this.jobs[this.jobs.length - 1];
    const lastJobId = lastJob ? lastJob.id : 0;
    return lastJobId + 1;
  }

  private getNextMaterialId(): number {
    let maxMaterialId = 0;
    this.jobs.forEach((job) => {
      job.materials.forEach((material) => {
        if (material.id > maxMaterialId) {
          maxMaterialId = material.id;
        }
      });
    });
    return maxMaterialId + 1;
  }

  private getNextLaborId(): number {
    let maxLaborId = 0;
    this.jobs.forEach((job) => {
      job.labors.forEach((labor) => {
        if (labor.id > maxLaborId) {
          maxLaborId = labor.id;
        }
      });
    });
    return maxLaborId + 1;
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
      [
        new Material(1, 'Wood', 220, 7000),
        new Material(2, 'Material 2', 92, 600),
      ],

      [new Labor(1, 'Labor 1', 500, 10000), new Labor(2, 'Labor 2', 20, 200)],
      JobStatus.InProgress
    );

    const job2 = new Job(
      2,
      'Job 2',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.2,
      [new Material(3, 'Material 3', 30, 300)],
      [new Labor(3, 'Labor 3', 30, 300)],
      JobStatus.Completed
    );

    const job3 = new Job(
      3,
      'Job 3',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.15,
      [
        new Material(4, 'Material 4', 40, 400),
        new Material(5, 'Material 5', 50, 500),
      ],
      [new Labor(4, 'Labor 4', 40, 400), new Labor(5, 'Labor 5', 50, 500)],
      JobStatus.InProgress
    );

    // Assign direct material costs to materials
    job1.materials[0].directMaterialCosts.push(
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
    job1.materials[0].directMaterialCosts.push(
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

    // Assign direct labor costs to labors
    job1.labors[0].directLaborCosts.push(
      new DirectLaborCost(1, 'Direct Labor Cost 1', 'DL-001', 12, 8, new Date())
    );
    job1.labors[0].directLaborCosts.push(
      new DirectLaborCost(
        2,
        'Direct Labor Cost 2',
        'DL-002',
        15,
        10,
        new Date()
      )
    );
    job1.labors[0].directLaborCosts.push(
      new DirectLaborCost(3, 'Direct Labor Cost 3', 'DL-003', 10, 6, new Date())
    );
    job1.labors[0].directLaborCosts.push(
      new DirectLaborCost(4, 'Direct Labor Cost 4', 'DL-004', 18, 8, new Date())
    );
    job1.labors[0].directLaborCosts.push(
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
