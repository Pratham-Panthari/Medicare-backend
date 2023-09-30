const mongoose = require('mongoose');
const Doctor = require('./Doctors');

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Paitent",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
})

reviewSchema.statics.calcAverageRatings = async function(doctorId) {

  const stats = await this.aggregate([{
    $match: { doctor: doctorId }
  },
  {
    $group : {
      _id: '$doctor',
      numOfRating: {$sum:1},
      avgRating : {$avg:'$rating'}
    }
  }
])

  await Doctor.findByIdAndUpdate(doctorId, {
    totalRatings: stats[0].numOfRating,
    averageRatings: stats[0].avgRating,
  })

}

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.doctor)
})

const Reviews = mongoose.model('Reviews', reviewSchema)

module.exports = Reviews