class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url

  has_many :artworks, serializer: UserArtworksSerializer
  has_many :liked_artworks
end
