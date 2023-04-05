class ArtworkSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :title, :likes

  has_many :tags
  belongs_to :user

  def likes
    self.object.user_likes.length
  end
end
