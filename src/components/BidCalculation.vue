<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { apiService } from './../services/apiService';
import type { CarCostCalculationRequest } from '@/commons/requests';
import type { CarCostCalculationResponse } from '@/commons/responses';
import { VehicleType } from '@/commons/enums';
import { AssociationFeeValue, BasicBuyeeFeeLabelValue, CommonEnumValue, CommonType, CommonTypeValue, CurrencySign,
         InputDefaultMessage, InvalidInputMessage, LuxuryType, LuxuryTypeValue, MainTitle, minAcceptableCarCost, SelectOptionMessage,
         SpecialFeeValue, StorageFee, StorageLabelValue, TotalPriceLabelValue } from '@/commons/ constants';


const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void; 
}>();

const options = [ 
  { value: CommonTypeValue, inputText: CommonType },
  { value: LuxuryTypeValue, inputText: LuxuryType }
];

let selected = ref<string | number>(''); 
let inputText = ref<number | null>(null);


let totalCalculated = ref<string>();
let specialFee = ref<string>();
let associationFee = ref<string>();
let basicFee = ref<string>();
let storageFixedFee = ref<string>();

let messageSelect = SelectOptionMessage;
let currencySign = CurrencySign;
let mainTitle = MainTitle;

let totalPiceLabel = TotalPriceLabelValue;
let basicBuyeeFeeLabel = BasicBuyeeFeeLabelValue;
let specialFeeLabel = SpecialFeeValue;
let associationFeeLabel = AssociationFeeValue;
let storageFeeLabel = StorageLabelValue;


let response : CarCostCalculationResponse;

function emitChange() {
  emit('update:modelValue', selected.value);
}

function debounce(func: Function, wait: number) {
  let timeout: number | undefined;
  return function(this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedRequestBid = debounce(() => {
  if (selected.value !== '' && inputText.value !== null && inputText.value >= 0)
  {
    RequestBid();
  }
}, 1000);

watch([inputText, selected], debouncedRequestBid);

onMounted(async () => {

});

const errorMessage = ref<string | null>(null);

async function RequestBid() {

    let request : CarCostCalculationRequest = {
    carCost : inputText.value!,
    type: selected.value.toString() == CommonEnumValue ? VehicleType.Common : VehicleType.Luxury
    }

    response = await apiService.RetrieveTotalCost(request);

    specialFee.value = response.sellerSpecialFee.toFixed(2);
    associationFee.value = response.associationFee.toFixed(2);
    basicFee.value = response.basicBuyerFee.toFixed(2);
    totalCalculated.value = response.total.toFixed(2);
    storageFixedFee.value = StorageFee.toFixed(2);
}

const validateInput = () => {
    errorMessage.value = (inputText.value !== null && inputText.value < minAcceptableCarCost) ? InvalidInputMessage : null;
};

</script>

<template>
    <div class="content">
        <h1>{{ mainTitle }}</h1>

        <div class="main-content">
            <div class="input-display">
                <div class="input-content">
                    <input v-model="inputText" @input="validateInput" placeholder='Enter the price of the car'>
                    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                    <select v-model="selected" @change="emitChange">
                        <option value="" disabled>{{messageSelect}}</option>
                        <option v-for="option in options" :key="option.value" :value="option.value">
                            {{ option.inputText }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="calculation-content">

                <div class="calculationlabels">
                    <label for="TotalPrice" >{{ totalPiceLabel }}</label>
                    <label for="BasicBuyer">{{ basicBuyeeFeeLabel }}</label>
                    <label for="Special">{{ specialFeeLabel }}</label>
                    <label for="Association">{{ associationFeeLabel }}</label>
                    <label for="Storage">{{ storageFeeLabel }}</label>
                </div>

                <div class="calculationspans">
                    <span id="TotalPrice">{{ totalCalculated }} {{ currencySign }}</span>
                    <span id="BasicBuyer">{{ basicFee }} {{ currencySign }}</span>
                    <span id="Special">{{ specialFee }} {{ currencySign }}</span>
                    <span id="Association">{{ associationFee }} {{ currencySign }}</span>
                    <span id="Storage">{{ storageFixedFee }} {{ currencySign }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content{
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
}

    h1{
        font-family: Arial, sans-serif;
        font-size: 72px;
        color: #fff;
        font-style: normal;
        margin-left: auto;
        margin-right: auto;
    }

.main-content{
    display: flex;
    width: 100%;
}

    .input-display{
        width: 50%;
        display: flex;
        flex-direction: column;
        flex-direction: column;
    }

        .input-display
        {
            width: 50%;
            display: flex;
        }

            .input-content{
                width: 25%;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                flex-direction: column;
            }

                .input-content input{
                    border-radius: 5px;
                    background: rgb(249, 250, 250);
                    border: 1px solid rgb(181, 189, 196);
                    font-size: 16px;
                    height: 40px;
                    line-height: 24px;
                    padding: 7px 8px;
                    color: rgb(8, 9, 10);
                    box-shadow: none;
                    :focus{
                        background-color: #fff;
                        border-color: #3b49df;
                        box-shadow: 1px 1px 0 #3b49df;
                        }
                }

                .input-content select
                {
                    min-width: 15ch;
                    max-width: 30ch;
                    border: 1px solid var(--select-border);
                    border-radius: 0.25em;
                    padding: 0.25em 0.5em;
                    font-size: 1.25rem;
                    cursor: pointer;
                    line-height: 1.1;
                    background-color: #fff;
                    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
                }

        
    .calculation-content
    {
        display: flex;
        width: 35%;
    }

        .calculationlabels{
            display: flex;
            flex-direction: column;
        }

            .calculationlabels label:first-child
            {
                font-weight: bold;
                font-size: xx-large;
                margin-left: auto;
                margin-right: 0;
            }

            .calculationlabels label
            {
                font-size: large;
                margin-left: auto;
                margin-right: 0;
            }


        .calculationspans{
            display: flex;
            flex-direction: column;
        }

            .calculationspans span:first-child
            {
                font-weight: bold;
                font-size: xx-large;
                margin-left: 2rem;
                animation: fadeIn 0.6s normal forwards;
            }

            .calculationspans span
            {
                font-size: large;
                margin-left: 2rem;
                animation: fadeIn 0.6s normal forwards;
            }


@keyframes fadeIn {
    0% {
        opacity: 0;
        }
    25% {
        opacity: 0.25;
        }
    50% {
        opacity: 0.5;
        }
    75% {
        opacity: 0.75;
        }
    100% {
        opacity: 1;
        }
    }


@keyframes fadeInImage {
    0% {
        opacity: 0.05;
        height: 60%;
        }
    25% {
        opacity: 0.25;
        height: 80%;
        }
    50% {
        opacity: 0.5;
        height: 100%;
        }
    75% {
        opacity: 0.75;
        height: 120%;
        }
    100% {
        opacity: 1;
        height: 125%;
        }
    }

    @keyframes fadeOutImage {
    0% {
        opacity: 1;
        height: 125%;
        }
    25% {
        opacity: 0.75;
        height: 120%;
        }
    50% {
        opacity: 0.5;
        height: 100%;
        }
    75% {
        opacity: 0.25;
        height: 80%;
        }
    100% {
        opacity: 0.05;
        height: 60%;
        }
    }


@media (min-width: 860) 
{
    .content
    {
        flex-direction: column;
    }

    .main-content{
        width: 100%;
        flex-direction: column;
    }

    .input-content{
        width: 100%;
    }

    .input-content input{
        width: 40%;
    }
}

</style>