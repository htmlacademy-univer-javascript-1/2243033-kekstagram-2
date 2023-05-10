const effectsRadioButtonsList = document.querySelectorAll('.effects__radio');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const original = document.querySelector('#effect-none');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
/**
 * создание слайдера при помощи библиотеки
 */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.8,
  step:0.1,
  connect: 'lower',
});
/**
 * объект с настройками фильтров: мин значение, макс значение, шаг, название фильра в CSS, единицы размерности(если есть)
 * @type {{heat: (number|string)[], marvin: (number|string)[], sepia: (number|string)[], phobos: (number|string)[], chrome: (number|string)[], none: (number|string)[]}}
 */
const Effects = {
  chrome: [0, 1, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0.1, 'sepia', ''],
  marvin: [0, 100, 1, 'invert', '%'],
  phobos: [0, 3, 0.1, 'blur', 'px'],
  heat: [0, 3, 0.1, 'brightness', ''],
  none: [0,0,0,'','']
};
/**
 * если оригинал изображения, плашку не показываю
 */
const isOriginal = () => {
  if (original.checked) {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
};
isOriginal();
/**
 * при выборе фильтра обновляются настройки под данный фильтр, вешается noUiSlider хэндлер, реагирующий на ползунок, меняющий интенсивность фильтра
 * @param {string} effectName имя эффекта фильтра
 */
const updateChoice = (effectName) => {
  sliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: Effects[effectName][0],
        max: Effects[effectName][1],
      },
      start: Effects[effectName][1],
      step: Effects[effectName][2],
    });
  sliderElement.noUiSlider.on('update', ()=> {
    effectLevelValue.value = sliderElement.noUiSlider.get();
    imageUploadPreview.style.filter = `${Effects[effectName][3]}(${effectLevelValue.value}${Effects[effectName][4]})`;
  });
};

/**
 * развешиваю слушатели на радиокнопки
 */
effectsRadioButtonsList.forEach((effectsRadioButton) => {
  effectsRadioButton.addEventListener('change', ()=>{
    imageUploadPreview.className='';
    imageUploadPreview.classList.add(`effects__preview--${effectsRadioButton.value}`);
    original.checked = false;
    effectsRadioButton.checked = true;
    isOriginal();
    updateChoice(effectsRadioButton.value);
  });
});


