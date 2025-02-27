const mongoose = require("mongoose")


const TicketSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        dateOfTravel: { type: Date },
        modeOfTravel: { type: String, enum: ["rail", "bus"] },
        perHeadPrice: { type: Number },
        from: { type: String },
        to: { type: String },
        numberOfPassengers: { type: Number },
        totalPrice: {
            type: Number, required: true,
            default: function () {
                return this.perHeadPrice * this.numberOfPassengers;
            }
        },

    }
)


const TicketModel = mongoose.model("ticket", TicketSchema)



module.exports = { TicketModel }