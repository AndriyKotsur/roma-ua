const Liqpay = (props) => (
    `<form id="donate" method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
        <input type="hidden" name="data" value="${props.data}" />
        <input type="hidden" name="signature" value="${props.signature}" />
        <input type="image" src="//static.liqpay.ua/buttons/p1ua.radius.png" name="btn_text" />
        <button id="donate-btn" type="submit"></button>
    </form>`
)

export default Liqpay