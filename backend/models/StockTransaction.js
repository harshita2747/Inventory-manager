const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'sale', 'adjustment', 'return', 'transfer'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  previousQuantity: {
    type: Number,
    required: true
  },
  newQuantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Unit price cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  reference: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  supplier: {
    name: {
      type: String,
      trim: true
    },
    contact: {
      type: String,
      trim: true
    }
  },
  customer: {
    name: {
      type: String,
      trim: true
    },
    contact: {
      type: String,
      trim: true
    }
  },
  location: {
    from: {
      type: String,
      trim: true
    },
    to: {
      type: String,
      trim: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'completed'
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
stockTransactionSchema.index({ product: 1, date: -1 });
stockTransactionSchema.index({ type: 1, date: -1 });
stockTransactionSchema.index({ performedBy: 1, date: -1 });

// Virtual for transaction summary
stockTransactionSchema.virtual('transactionSummary').get(function() {
  return `${this.type.toUpperCase()}: ${this.quantity} units of ${this.product}`;
});

// Method to get transaction value
stockTransactionSchema.methods.getTransactionValue = function() {
  return this.quantity * this.unitPrice;
};

// Static method to get transactions by date range
stockTransactionSchema.statics.getTransactionsByDateRange = function(startDate, endDate) {
  return this.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('product', 'name sku').populate('performedBy', 'firstName lastName');
};

// Static method to get low stock products
stockTransactionSchema.statics.getLowStockProducts = function() {
  return this.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productInfo'
      }
    },
    {
      $unwind: '$productInfo'
    },
    {
      $group: {
        _id: '$product',
        totalQuantity: { $sum: '$quantity' },
        productInfo: { $first: '$productInfo' }
      }
    },
    {
      $match: {
        $expr: {
          $lte: ['$totalQuantity', '$productInfo.minQuantity']
        }
      }
    }
  ]);
};

module.exports = mongoose.model('StockTransaction', stockTransactionSchema); 