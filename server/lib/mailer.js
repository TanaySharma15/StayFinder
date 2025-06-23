import nodemailer from "nodemailer"

export const sendBookingConfirmationEMail = async (to, bookingDetails) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    await transporter.sendMail({
        from: "StayFinder",
        to,
        subject: "Booking confirmed",
        html: `<h2>Thanks for booking!</h2>
           <p>Your booking for <strong>${bookingDetails.listingName}</strong> is confirmed.</p>
           <p>From ${bookingDetails.startDate} to ${bookingDetails.endDate}</p>`,

    })
}