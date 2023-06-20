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
      labors
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
  addDirectMaterialCost(
    jobId: number,
    materialId: number,
    name: string,
    refNo: string,
    seller: string,
    units: number,
    costPerUnit: number,
    date: Date
  ): void {
    const job = this.getJobById(jobId);
    if (job) {
      const material = job.materials.find((mat) => mat.id === materialId);
      if (material) {
        const directMaterialCostId = this.getNextDirectMaterialCostId(
          material.directMaterialCosts
        );
        const directMaterialCost = new DirectMaterialCost(
          directMaterialCostId,
          name,
          units,
          costPerUnit,
          seller,
          refNo,
          date
        );
        material.directMaterialCosts.push(directMaterialCost);
      }
    }
  }

  private getNextDirectMaterialCostId(
    directMaterialCosts: DirectMaterialCost[]
  ): number {
    const lastDirectMaterialCost =
      directMaterialCosts[directMaterialCosts.length - 1];
    const lastDirectMaterialCostId = lastDirectMaterialCost
      ? lastDirectMaterialCost.id
      : 0;
    return lastDirectMaterialCostId + 1;
  }

  addDirectLaborCost(
    jobId: number,
    laborId: number,
    name: string,
    refNo: string,
    hours: number,
    costPerHour: number,
    date: Date
  ): void {
    const job = this.getJobById(jobId);
    if (job) {
      const labor = job.labors.find((lab) => lab.id === laborId);
      if (labor) {
        const directLaborCostId = this.getNextDirectLaborCostId(
          labor.directLaborCosts
        );
        const directLaborCost = new DirectLaborCost(
          directLaborCostId,
          name,
          refNo,
          hours,
          costPerHour,
          date
        );
        labor.directLaborCosts.push(directLaborCost);
      }
    }
  }

  private getNextDirectLaborCostId(
    directLaborCosts: DirectLaborCost[]
  ): number {
    const lastDirectLaborCost = directLaborCosts[directLaborCosts.length - 1];
    const lastDirectLaborCostId = lastDirectLaborCost
      ? lastDirectLaborCost.id
      : 0;
    return lastDirectLaborCostId + 1;
  }

  getDirectMaterialCostById(
    jobId: number,
    materialId: number,
    costId: number
  ): DirectMaterialCost | undefined {
    const job = this.getJobById(jobId);
    if (job) {
      const material = job.materials.find((mat) => mat.id === materialId);
      if (material) {
        return material.directMaterialCosts.find((cost) => cost.id === costId);
      }
    }
    return undefined;
  }

  getDirectLaborCostById(
    jobId: number,
    laborId: number,
    costId: number
  ): DirectLaborCost | undefined {
    const job = this.getJobById(jobId);
    if (job) {
      const labor = job.labors.find((lab) => lab.id === laborId);
      if (labor) {
        return labor.directLaborCosts.find((cost) => cost.id === costId);
      }
    }
    return undefined;
  }

  updateDirectMaterialCost(
    jobId: number,
    materialId: number,
    costId: number,
    name: string,
    refNo: string,
    seller: string, 
    units: number,
    costPerUnit: number,
    date: Date
  ): void {
    const cost = this.getDirectMaterialCostById(jobId, materialId, costId);
    if (cost) {
      cost.name = name;
      cost.refNo = refNo;
      cost.units = units;
      cost.seller = seller; 
      cost.costPerUnit = costPerUnit;
      cost.date = date;
    }
  }

  updateDirectLaborCost(
    jobId: number,
    laborId: number,
    costId: number,
    name: string,
    refNo: string, 
    hours: number,
    costPerHour: number,
    date: Date
  ): void {
    const cost = this.getDirectLaborCostById(jobId, laborId, costId);
    if (cost) {
      cost.name = name;
      cost.hours = hours;
      cost.refNo = refNo; 
      cost.costPerHour = costPerHour;
      cost.date = date;
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
      [
        new Material(1, 'Wood', 220, 7000),
        new Material(2, 'Material 2', 92, 600),
      ],

      [new Labor(1, 'Labor 1', 500, 10000), new Labor(2, 'Labor 2', 20, 200)]
    );

    const job2 = new Job(
      2,
      'Job 2',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.2,
      [new Material(3, 'Material 3', 30, 300)],
      [new Labor(3, 'Labor 3', 30, 300)]
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
      [new Labor(4, 'Labor 4', 40, 400), new Labor(5, 'Labor 5', 50, 500)]
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
