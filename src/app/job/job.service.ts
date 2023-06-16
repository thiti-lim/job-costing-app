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

  private material1: Material = {
    id: 1,
    name: 'Material 1',
    estimatedUnits: 10,
    estimatedTotalCost: 100,
    actualUnits: 0,
    actualCost: 0,
    directMaterialCosts: [],
  };
  private material2: Material = {
    id: 2,
    name: 'Material 2',
    estimatedUnits: 20,
    estimatedTotalCost: 200,
    actualUnits: 0,
    actualCost: 0,
    directMaterialCosts: [],
  };
  private material3: Material = {
    id: 3,
    name: 'Material 3',
    estimatedUnits: 30,
    estimatedTotalCost: 300,
    actualUnits: 0,
    actualCost: 0,
    directMaterialCosts: [],
  };

  private labor1: Labor = {
    id: 1,
    name: 'Labor 1',
    estimatedHours: 10,
    estimatedTotalCost: 100,
    actualHours: 0,
    actualTotalCost: 0,
    directLaborCosts: [],
  };
  private labor2: Labor = {
    id: 2,
    name: 'Labor 2',
    estimatedHours: 20,
    estimatedTotalCost: 200,
    actualHours: 0,
    actualTotalCost: 0,
    directLaborCosts: [],
  };
  private labor3: Labor = {
    id: 3,
    name: 'Labor 3',
    estimatedHours: 30,
    estimatedTotalCost: 300,
    actualHours: 0,
    actualTotalCost: 0,
    directLaborCosts: [],
  };

  constructor(private customerService: CustomerService) {}

  getJobs(): Job[] {
    return this.jobs;
  }

  createMockJobs(): void {
    // Create jobs using mock data
    const job1 = new Job(
      1,
      'JOB-1',
      this.customerService.getCustomerById(1)!,
      new Date(),
      new Date(),
      0.2,
      JobStatus.InProgress
    );
    job1.materials = [this.material1, this.material2];
    job1.labors = [this.labor1, this.labor2];
    job1.labors[0].directLaborCosts = [
      new DirectLaborCost(
        1,
        'Direct Labor Cost 1',
        'DL-001',
        job1.labors[0],
        15,
        5,
        new Date()
      ),
      new DirectLaborCost(
        2,
        'Direct Labor Cost 2',
        'DL-002',
        job1.labors[0],
        20,
        8,
        new Date()
      ),
    ];
    job1.materials[0].directMaterialCosts = [
      new DirectMaterialCost(
        1,
        'Direct Material Cost 1',
        job1.materials[0],
        10,
        10,
        'Seller 1',
        'DM-001',
        new Date()
      ),
      new DirectMaterialCost(
        2,
        'Direct Material Cost 2',
        job1.materials[0],
        20,
        15,
        'Seller 2',
        'DM-002',
        new Date()
      ),
    ];
    this.jobs.push(job1);

    const job2 = new Job(
      2,
      'JOB-2',
      this.customerService.getCustomerById(2)!,
      new Date(),
      new Date(),
      0.85,
      JobStatus.Completed
    );
    job2.materials = [this.material2];
    job2.labors = [this.labor2];
    job2.labors[0].directLaborCosts = [
      new DirectLaborCost(
        3,
        'Direct Labor Cost 3',
        'DL-003',
        job2.labors[0],
        10,
        3,
        new Date()
      ),
      new DirectLaborCost(
        4,
        'Direct Labor Cost 4',
        'DL-004',
        job2.labors[0],
        25,
        6,
        new Date()
      ),
    ];
    job2.materials[0].directMaterialCosts = [
      new DirectMaterialCost(
        3,
        'Direct Material Cost 3',
        job2.materials[0],
        15,
        8,
        'Seller 1',
        'DM-003',
        new Date()
      ),
    ];
    this.jobs.push(job2);

    const job3 = new Job(
      3,
      'JOB-3',
      this.customerService.getCustomerById(3)!,
      new Date(),
      new Date(),
      0.75,
      JobStatus.InProgress
    );
    job3.materials = [this.material1, this.material3];
    job3.labors = [this.labor1, this.labor3];
    job3.labors[0].directLaborCosts = [
      new DirectLaborCost(
        5,
        'Direct Labor Cost 5',
        'DL-005',
        job3.labors[0],
        12,
        4,
        new Date()
      ),
    ];
    job3.labors[1].directLaborCosts = [
      new DirectLaborCost(
        6,
        'Direct Labor Cost 6',
        'DL-006',
        job3.labors[1],
        18,
        7,
        new Date()
      ),
      new DirectLaborCost(
        7,
        'Direct Labor Cost 7',
        'DL-007',
        job3.labors[1],
        22,
        5,
        new Date()
      ),
    ];
    job3.materials[0].directMaterialCosts = [
      new DirectMaterialCost(
        4,
        'Direct Material Cost 4',
        job3.materials[0],
        8,
        12,
        'Seller 2',
        'DM-004',
        new Date()
      ),
      new DirectMaterialCost(
        5,
        'Direct Material Cost 5',
        job3.materials[0],
        12,
        10,
        'Seller 3',
        'DM-005',
        new Date()
      ),
    ];
    job3.materials[1].directMaterialCosts = [
      new DirectMaterialCost(
        6,
        'Direct Material Cost 6',
        job3.materials[1],
        20,
        15,
        'Seller 1',
        'DM-006',
        new Date()
      ),
      new DirectMaterialCost(
        7,
        'Direct Material Cost 7',
        job3.materials[1],
        25,
        18,
        'Seller 3',
        'DM-007',
        new Date()
      ),
    ];
    this.jobs.push(job3);
  }
}
