class User < ApplicationRecord
  has_many :artworks
  has_many :user_likes
  # has_many :artworks, through: :user_likes
end
