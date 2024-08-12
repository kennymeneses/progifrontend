<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from './../services/apiService';
import type { CarCostCalculationRequest } from '@/commons/requests';
import type { CarCostCalculationResponse } from '@/commons/responses';

// defineProps<{
//   text: number
// }>()

const props = defineProps<{
  modelValue?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void; 
}>();

const options = [ 
  { value: 0, text: 'Common' },
  { value: 1, text: 'Luxury' }
];

//const selected = ref(props.modelValue ?? options[0].value); 

const selected = ref<string | number>(''); 

let request : CarCostCalculationRequest = {
  carCost : 1100,
  type: 0
}

let response : CarCostCalculationResponse;

function emitChange() {
  emit('update:modelValue', selected.value);

  console.log(selected.value);
}

onMounted(async () => {

});

let text = ref(null);
const errorMessage = ref<string | null>(null);

async function RequestBid() {

    response= await apiService.RetrieveTotalCost(request);
    console.log(response);
}

const validateInput = () => {
    errorMessage.value = (text.value !== null && text.value < 1) ? 'The value must be greater than or equal to 1.' : null;
};

</script>

<template>
    <div class="content">
        <!-- <h1>Cotizacion Ahora</h1> -->

        <div class="input-display">
            <div class="input-animation">
                <img src="./../assets/commoncar.png" alt="" srcset="">
                <img src="./../assets/luxurycar.png" alt="" srcset="">
            </div>

            <div class="input-content">
                <input v-model="text" @input="validateInput" placeholder="Enter a number" >
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                <select v-model="selected" @change="emitChange">
                    <option value="" disabled>Select an option</option>
                    <option v-for="option in options" :key="option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>
            </div>
        </div>

        <div class="calculation-content">
            <label for=""></label>
        </div>

    </div>
</template>




<style scoped>
.content{
    width: 100vw;
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    margin-left: auto;
    margin-right: auto;
}

.input-display{
    width: 100%;
    /* margin-left: auto;
    margin-right: auto; */
    display: flex;
    flex-direction: column;
    background-color: green;
    flex-direction: column;
}

    .input-animation
    {
        overflow: hidden;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        display: flex;
        background-color: pink;
        justify-content: space-around;
    }

    .input-animation img
    {
        width: 25%;
        background-color:  white;
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

        
    .calculation-content
    {
        display: flex;
        flex-direction: column;
    }


.animation{
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
}

@media (min-width: 860) 
{
    .main-content{
        width: 100%;
    }
}

</style>