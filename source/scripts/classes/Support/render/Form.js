const Form = () => (
    `<div class="donate__form">
        <h3 class="payment-title">Заповніть, будь ласка, поля</h3>
        <form id="confirm" class="payment-form">
            <input id="confirm-name" type="text" name="name" class="payment-input" placeholder="Введіть ваше ім'я" required />
            <input id="confirm-phone" type="tel" name="phone" class="payment-input" placeholder="Введіть ваше номер телефону" required />
            <input id="confirm-email" type="email" name="email" class="payment-input" placeholder="Введіть ваш електронний адрес" required />
            <div class="payment-agreement">
                <label class="payment-checkbox">
                    <input id="confirm-policy" type="checkbox" required>
                    <svg class="icon icon-checkbox">
                        <use href="/icons/sprite.svg#icon-checkbox"></use>
                    </svg>
                </label>
                <p>Я прочитав та погоджуюся з умовами <a href='/offer-agreement' target='_blank' rel='noopener noreferrer'>договору оферти</a> та <a href='/privacy-policy' target='_blank' rel='noopener noreferrer'>політики конфіденційності</a></p>
            </div>
            <button type="submit" class="btn btn-green payment-btn">Підтримати</button>
        </form>
    </div>`
)

export default Form