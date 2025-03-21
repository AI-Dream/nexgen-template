<template>
  <div v-if="addressStore.modalShippingUpdate" class="modal show d-block" id="addressModal" tabindex="-1"
    aria-modal="true" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 overflow-hidden">

        <div class="modal-header border-0 text-white py-3 d-flex justify-content-between">
          <h5 class="modal-title ms-2">Add Shipping Address</h5>
          <button class="mr-5"
            @click="addressStore.closeModal('shipping-update');"><svg-remove></svg-remove></button>
        </div>

        <div class="modal-body pt-30 pl-30 pr-30 pb-30">
          <form @submit="onSubmit">
            <div class="mb-30">
              <div class="d-flex align-items-center mb-20">
                <h6 class="mb-0 fw-bold">ข้อมูลผู้รับสินค้า</h6>
              </div>

              <div class="row g-3">
                <div class="col-md-6">
                  <div>
                    <label for="first_name" class="d-flex justify-content-between">
                      <span>ชื่อจริง<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="first_name" v-model="first_name" placeholder="กรอกชื่อจริง"
                      :class="{ 'error-field': errors.first_name }">
                    <err-message :msg="errors.first_name" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="last_name" class="d-flex justify-content-between">
                      <span>นามสกุล<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="last_name" v-model="last_name" placeholder="กรอกนามสกุล"
                      :class="{ 'error-field': errors.last_name }">
                    <err-message :msg="errors.last_name" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="phone" class="d-flex justify-content-between">
                      <span>เบอร์โทรศัพท์<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="phone" v-model="phone" placeholder="กรอกเบอร์โทรศัพท์"
                      :class="{ 'error-field': errors.phone }">
                    <err-message :msg="errors.phone" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="email" class="d-flex justify-content-between">
                      <span>อีเมล<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="email" v-model="email" placeholder="กรอกอีเมล"
                      :class="{ 'error-field': errors.email }">
                    <err-message :msg="errors.email" />
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-30">
              <div class="d-flex align-items-center mb-20">
                <h6 class="mb-0 fw-bold">ข้อมูลที่อยู่ผู้รับ</h6>
              </div>

              <div class="row g-3">
                <div class="col-md-4">
                  <div>
                    <label for="house_no" class="d-flex justify-content-between">
                      <span>บ้านเลขที่</span>
                    </label>
                    <input type="text" id="house_no" v-model="house_no" placeholder="กรอกบ้านเลขที่"
                      :class="{ 'error-field': errors.house_no }">
                    <err-message :msg="errors.house_no" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="room_no" class="d-flex justify-content-between">
                      <span>ห้องเลขที่</span>
                    </label>
                    <input type="text" id="room_no" v-model="room_no" placeholder="กรอกชื่อหมู่บ้าน"
                      :class="{ 'error-field': errors.room_no }">
                    <err-message :msg="errors.room_no" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="floor" class="d-flex justify-content-between">
                      <span>ชั้นที่</span>
                    </label>
                    <input type="text" id="floor" v-model="floor" placeholder="กรอกชื่อถนน"
                      :class="{ 'error-field': errors.floor }">
                    <err-message :msg="errors.floor" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="building_name" class="d-flex justify-content-between">
                      <span>อาคาร</span>
                    </label>
                    <input type="text" id="building_name" v-model="building_name" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.building_name }">
                    <err-message :msg="errors.building_name" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="moo_ban" class="d-flex justify-content-between">
                      <span>หมู่บ้าน</span>
                    </label>
                    <input type="text" id="moo_ban" v-model="moo_ban" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.moo_ban }">
                    <err-message :msg="errors.moo_ban" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="moo_no" class="d-flex justify-content-between">
                      <span>หมู่ที่</span>
                    </label>
                    <input type="text" id="moo_no" v-model="moo_no" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.moo_no }">
                    <err-message :msg="errors.moo_no" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="soi" class="d-flex justify-content-between">
                      <span>ตรอก/ซอย</span>
                    </label>
                    <input type="text" id="soi" v-model="soi" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.soi }">
                    <err-message :msg="errors.soi" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="yaek" class="d-flex justify-content-between">
                      <span>แยก</span>
                    </label>
                    <input type="text" id="yaek" v-model="yaek" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.yaek }">
                    <err-message :msg="errors.yaek" />
                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    <label for="street" class="d-flex justify-content-between">
                      <span>ถนน</span>
                    </label>
                    <input type="text" id="street" v-model="street" placeholder="กรอกชื่อซอย"
                      :class="{ 'error-field': errors.street }">
                    <err-message :msg="errors.street" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="sub_district" class="d-flex justify-content-between">
                      <span>ตำบลหรือแขวง<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="sub_district" v-model="sub_district" placeholder="กรอกตำบลหรือแขวง"
                      :class="{ 'error-field': errors.sub_district }">
                    <err-message :msg="errors.sub_district" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="district" class="d-flex justify-content-between">
                      <span>อำเภอหรือเขต<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="district" v-model="district" placeholder="กรอกอำเภอหรือเขต"
                      :class="{ 'error-field': errors.district }">
                    <err-message :msg="errors.district" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="province" class="d-flex justify-content-between">
                      <span>จังหวัด<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="province" v-model="province" placeholder="กรอกจังหวัด"
                      :class="{ 'error-field': errors.province }">
                    <err-message :msg="errors.province" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div>
                    <label for="zipcode" class="d-flex justify-content-between">
                      <span>รหัสไปรษณีย์<span class="text-danger">*</span></span>
                    </label>
                    <input type="text" id="zipcode" v-model="zipcode" placeholder="กรอกรหัสไปรษณีย์"
                      :class="{ 'error-field': errors.zipcode }">
                    <err-message :msg="errors.zipcode" />
                  </div>
                </div>

                <div class="col-md-12">
                  <div>
                    <label for="note_address" class="d-flex justify-content-between">
                      <span>หมายเหตุ<span class="text-danger">*</span></span>
                    </label>
                    <textarea type="text" id="note_address" v-model="note_address" placeholder="กรอกหมายเหตุ"
                      :class="{ 'error-field': errors.note_address }"></textarea>
                    <err-message :msg="errors.note_address" />
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button type="button" class="tp-btn">Exit</button>
              <button type="submit" class="tp-btn">{{ addressStore.isLoading ? 'Saving...' : 'Save' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '@/pinia/useAddressStore';
import { ref, nextTick, watch } from 'vue';

const addressStore = useAddressStore();

import { useForm, Form } from "vee-validate";
import * as yup from "yup";

interface IFormValues {
  id?: number | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  house_no?: string | null;
  moo_ban?: string | null;
  building_name?: string | null;
  street?: string | null;
  soi?: string | null;
  room_no?: string | null;
  floor?: string | null;
  moo_no?: string | null;
  yaek?: string | null;
  sub_district?: string | null;
  district?: string | null;
  province?: string | null;
  phone?: string | null;
  zipcode?: string | null;
  note_address?: string | null;
  default_address?: 'Y' | 'N' | null;
  role_user?: string | null;
}

const { defineField, handleSubmit, errors, resetForm } = useForm<IFormValues>({
  validationSchema: yup.object({
    first_name: yup.string().required('กรุณากรอกชื่อจริง'),
    last_name: yup.string().required('กรุณากรอกนามสกุล'),
    email: yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
    phone: yup.string().matches(/^\d{10}$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก').required('กรุณากรอกเบอร์โทรศัพท์'),
    house_no: yup.string(),
    moo_ban: yup.string(),
    building_name: yup.string(),
    street: yup.string(),
    soi: yup.string(),
    room_no: yup.string(),
    floor: yup.string(),
    moo_no: yup.string(),
    yaek: yup.string(),
    sub_district: yup.string().required('กรุณากรอกตำบลหรือแขวง'),
    district: yup.string().required('กรุณากรอกอำเภอหรือเขต'),
    province: yup.string().required('กรุณากรอกจังหวัด'),
    zipcode: yup.string().matches(/^\d{5}$/, 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก').required('กรุณากรอกรหัสไปรษณีย์'),
    note_address: yup.string(),
    default_address: yup.string().oneOf(['Y', 'N'], 'เลือกค่าที่อยู่หลักไม่ถูกต้อง'),
  }),
});

const scrollToFirstError = () => {
  nextTick(() => {
    const errorFields = document.querySelectorAll('.error-field');
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0] as HTMLElement;
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

function onSuccess(values: any) {
  addressStore.updateShippingAddress(values)
}

function onInvalidSubmit() {
  scrollToFirstError();
}

const [id, idAttrs] = defineField('id');
const [first_name, first_nameAttrs] = defineField('first_name');
const [last_name, last_nameAttrs] = defineField('last_name');
const [phone, phoneAttrs] = defineField('phone');
const [email, emailAttrs] = defineField('email');
const [house_no, house_noAttrs] = defineField('house_no');
const [moo_ban, moo_banAttrs] = defineField('moo_ban');
const [building_name, building_nameAttrs] = defineField('building_name');
const [street, streetAttrs] = defineField('street');
const [soi, soiAttrs] = defineField('soi');
const [room_no, room_noAttrs] = defineField('room_no');
const [floor, floorAttrs] = defineField('floor');
const [moo_no, moo_noAttrs] = defineField('moo_no');
const [yaek, yaekAttrs] = defineField('yaek');
const [sub_district, sub_districtAttrs] = defineField('sub_district');
const [district, districtAttrs] = defineField('district');
const [province, provinceAttrs] = defineField('province');
const [zipcode, zipcodeAttrs] = defineField('zipcode');
const [note_address, note_addressAttrs] = defineField('note_address');
const [default_address, default_addressAttrs] = defineField('default_address');

watch(() => addressStore.updatingRecord, (updatingRecord) => {
  if (updatingRecord) {
    id.value = updatingRecord.id ?? '';
    first_name.value = updatingRecord.first_name ?? '';
    last_name.value = updatingRecord.last_name ?? '';
    phone.value = updatingRecord.phone ?? '';
    email.value = updatingRecord.email ?? '';
    house_no.value = updatingRecord.house_no ?? '';
    moo_ban.value = updatingRecord.moo_ban ?? '';
    building_name.value = updatingRecord.building_name ?? ''; 
    street.value = updatingRecord.street ?? '';
    soi.value = updatingRecord.soi ?? '';
    room_no.value = updatingRecord.room_no ?? '';
    floor.value = updatingRecord.floor ?? '';
    moo_no.value = updatingRecord.moo_no ?? '';
    yaek.value = updatingRecord.yaek ?? '';
    sub_district.value = updatingRecord.sub_district ?? '';
    district.value = updatingRecord.district ?? '';
    province.value = updatingRecord.province ?? '';
    zipcode.value = updatingRecord.zip_code ?? '';
    note_address.value = updatingRecord.note_address ?? '';
    default_address.value = updatingRecord.default_address ?? 'N';
  }
});
</script>

<style scoped>
.modal-header {
  background-color: #010f14;
}

.modal-header .modal-title,
.modal-header button {
  color: #fff;
}

.error-field {
  border: 1px solid #dc3545 !important;
  background-color: rgba(220, 53, 69, 0.05);
}

.modal-body {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>