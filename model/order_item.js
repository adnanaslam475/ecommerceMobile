import moment from 'moment'
class orderItem {
    constructor(id, item, amount, date) {
        this.id = id
        this.item = item
        this.amount = amount
        this.date = date
    }
    get getDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default orderItem