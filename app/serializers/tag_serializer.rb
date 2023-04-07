class TagSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :artworks
  belongs_to :users
end
