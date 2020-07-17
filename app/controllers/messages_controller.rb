class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    room = Room.find(message_params[:room])
    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash
      MessagesChannel.broadcast_to room, serialized_data
      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :room)
  end
end
