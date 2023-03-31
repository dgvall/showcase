class Artwork < ApplicationRecord
  belongs_to :user
  has_many :user_likes
  has_many :users, through: :user_likes
  has_many :artwork_tags
  has_many :tags, through: :artwork_tags
end
