class ArtworkTag < ApplicationRecord
  belongs_to :artwork
  belongs_to :tag
end
