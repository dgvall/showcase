class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url

  has_many :artworks
  has_many :liked_artworks
end
