import { baseURl } from '@/commons/ constants';
import type { CarCostCalculationRequest } from './../commons/requests';
import type { CarCostCalculationResponse } from './../commons/responses';

const postRequest = async (endpoint: string, body: any): Promise<any> => {
    const response = await fetch(`${baseURl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
};

export const apiService = {

    RetrieveTotalCost(carCostCalculationRequest: CarCostCalculationRequest): Promise<CarCostCalculationResponse> 
    {
        return postRequest('BidCalculations', carCostCalculationRequest);
    }
}