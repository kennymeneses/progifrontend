import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BidCalculation from '../BidCalculation.vue';
import { MainTitle } from '@/commons/ constants';


vi.mock('../../services/apiService', () => ({
    apiService: {
      RetrieveTotalCost: vi.fn()
    }
  }));

  describe('BidCalculation.vue', () => {
    let wrapper : any;
  
    beforeEach(() => {
      wrapper = mount(BidCalculation, {
        global: {
          mocks: {
            $t: (msg: string) => msg
          }
        }
      });
    });
  
    it('should render the main title correctly', () => {
      expect(wrapper.find('h1').text()).toBe(MainTitle);
    });
  
    it('should render the input and select fields', () => {
      expect(wrapper.find('input').exists()).toBe(true);
      expect(wrapper.find('select').exists()).toBe(true);
    });
  });