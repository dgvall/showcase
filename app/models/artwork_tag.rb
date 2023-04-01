class ArtworkTag < ApplicationRecord
  belongs_to :artwork, dependent: :destroy
  belongs_to :tag
end
