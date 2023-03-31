class User < ApplicationRecord
  has_many :artworks
  
  has_many :user_likes
  has_many :liked_artworks, through: :user_likes, source: :artwork
end
