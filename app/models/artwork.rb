class Artwork < ApplicationRecord
  belongs_to :user

  has_many :user_likes
  has_many :liked_by, through: :user_likes, source: :user

  has_many :artwork_tags
  has_many :tags, through: :artwork_tags
end
