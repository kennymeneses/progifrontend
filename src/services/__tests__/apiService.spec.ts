import { describe, it, expect, vi } from 'vitest';
import { apiService } from '../apiService';
import type { CarCostCalculationRequest } from '@/commons/requests';
import type { CarCostCalculationResponse } from '@/commons/responses';
import { baseURl } from '@/commons/ constants';

const mockResponse: CarCostCalculationResponse = {
    total : 2167,
    basicBuyerFee :180,
    associationFee: 15,
    sellerSpecialFee: 72 
};

const mockFetch = vi.fn(() => 
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        statusText: 'OK',
    })
);

vi.stubGlobal('fetch', mockFetch);

describe('apiService', () => {
    it('should retrieve total cost successfully', async () => {
        const requestPayload: CarCostCalculationRequest = {
            // Agrega aquí los campos necesarios para el test
            type : 0,
            carCost: 1800
            // Otros campos
        };

        const response = await apiService.RetrieveTotalCost(requestPayload);

        expect(mockFetch).toHaveBeenCalledWith(
            `${baseURl}`+ 'BidCalculations',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload),
            }
        );
        expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the response is not OK', async () => {
        // Simula un fetch que retorna un error
        const errorFetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Not Found',
            })
        );

        vi.stubGlobal('fetch', errorFetch);

        const requestPayload: CarCostCalculationRequest = {
            // Agrega aquí los campos necesarios para el test
            // Otros campos
            type : 0,
            carCost: 0
        };

        await expect(apiService.RetrieveTotalCost(requestPayload)).rejects.toThrow('Error: Not Found');
    });
});