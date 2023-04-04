class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :title

  has_many :tags
  has_many :user_likes
  belongs_to :user
end
