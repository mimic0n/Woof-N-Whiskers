export const emailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
export const phoneValid = value => /^(0|\+84)\d{9}$/.test(String(value).replace(/[\s.-]/g,''));
export function customerErrors(data, address = false) {
 const errors = {};
 if (!data.name?.trim()) errors.name = 'required';
 if (!emailValid(data.email)) errors.email = 'emailError';
 if (!phoneValid(data.phone)) errors.phone = 'phoneError';
 if (address && !data.address?.trim()) errors.address = 'required';
 return errors;
}
export function petErrors(data, booking = false) {
 const errors = {};
 if (!data.name?.trim()) errors.petName='required';
 if (!data.species) errors.species='required';
 if (booking && !data.breed?.trim()) errors.breed='required';
 if (!Number.isFinite(Number(data.weight)) || Number(data.weight)<=0) errors.weight='weightError';
 return errors;
}
export function focusError(errors) { requestAnimationFrame(() => document.getElementById(Object.keys(errors)[0])?.focus()); }
