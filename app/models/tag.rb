class Tag < ApplicationRecord
  has_many :artwork_tags
  has_many :artworks, through: :artwork_tags
end
