import type { CarCostCalculationRequest } from './../commons/requests';
import type { CarCostCalculationResponse } from './../commons/responses';

const postRequest = async (endpoint: string, body: any): Promise<any> => {
    const response = await fetch(`https://localhost:7000/api/v1/${endpoint}`, {
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