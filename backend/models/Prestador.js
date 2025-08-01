// models/Prestador.js
const mongoose = require('mongoose');

const prestadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  location: {
    address: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number]
    }
  },
  services: {
    type: [{
      type: {
        type: String,
        enum: ['paseo', 'cuidado', 'peluqueria', 'dentista'],
        required: true
      },
      description: String,
      price: Number
    }],
    default: [] // 👈 siempre array
  },
  availability: [{
    day: String,
    slots: [String]
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    comment: String,
    rating: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  profileImage: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Crear índice para búsquedas geoespaciales
prestadorSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model('Prestador', prestadorSchema); 