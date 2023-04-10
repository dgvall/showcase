class User < ApplicationRecord
  has_secure_password
  has_many :artworks
  
  has_many :user_likes
  has_many :liked_artworks, through: :user_likes, source: :artwork

  validates :username, presence: true, uniqueness: {case_sensitive: false}
  validates :image_url, presence: true
end
