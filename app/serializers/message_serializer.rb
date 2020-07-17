class MessageSerializer < ActiveModel::Serializer
  attributes :id, :room_id, :text, :created_at
end
