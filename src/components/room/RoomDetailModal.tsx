import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import RoomStatusBadge from '@/components/room/RoomStatusBadge';
import BookingStatusBadge from '@/components/booking/BookingStatusBadge';
import { Room, RoomStatus } from '@/types';

/**
 * RoomDetailModal Component
 * 
 * This component displays detailed information about a room and provides
 * functionality to manage the room (change status, add notes, etc.).
 * 
 * Usage:
 * ```tsx
 * <RoomDetailModal
 *   room={selectedRoom}
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onStatusChange={(status) => handleRoomStatusChange(roomId, status)}
 *   onAddNote={(note) => handleAddNote(roomId, note)}
 * />
 * ```
 */

interface RoomDetailModalProps {
  room: Room & { currentBooking?: any } | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: RoomStatus) => void;
  onAddNote: (note: string) => void;
}

/**
 * Modal for displaying and managing room details
 */
export default function RoomDetailModal({ 
  room, 
  isOpen, 
  onClose,
  onStatusChange,
  onAddNote
}: RoomDetailModalProps) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  if (!room) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={`Phòng ${room.name} - ${room.type}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Room Info */}
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Trạng thái hiện tại:</p>
              <div className="mt-1">
                <RoomStatusBadge status={room.status} />
              </div>
              
              {room.currentBooking && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Trạng thái đặt phòng:</p>
                  <div className="mt-1">
                    <BookingStatusBadge status={room.currentBooking.status} />
                  </div>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Giá mặc định:</p>
              <p className="font-medium">{room.defaultPrice.toLocaleString('vi-VN')} VND/đêm</p>
            </div>
          </div>
        </div>
        
        {/* Change Status */}
        <div>
          <h4 className="font-medium mb-2">Đổi trạng thái phòng</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={room.status === RoomStatus.VACANT ? 'primary' : 'outline'} 
              onClick={() => onStatusChange(RoomStatus.VACANT)}
            >
              Trống
            </Button>
            <Button 
              variant={room.status === RoomStatus.CLEANING ? 'primary' : 'outline'}
              onClick={() => onStatusChange(RoomStatus.CLEANING)}
            >
              Đang dọn
            </Button>
            <Button 
              variant={room.status === RoomStatus.MAINTENANCE ? 'primary' : 'outline'}
              onClick={() => onStatusChange(RoomStatus.MAINTENANCE)}
            >
              Bảo trì
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="font-medium mb-2">Thao tác nhanh</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="success">Đặt phòng nhanh</Button>
            <Button variant="success">Check-in nhanh</Button>
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <h4 className="font-medium mb-2">Ghi chú</h4>
          <div>
            {room.notes && room.notes.length > 0 ? (
              <div className="mb-3 space-y-1">
                {room.notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                    {note}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-3">Chưa có ghi chú</p>
            )}
            <FormInput
              value={newNote}
              onChange={setNewNote}
              onSubmit={handleAddNote}
              placeholder="Thêm ghi chú..."
              buttonLabel="Thêm"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
