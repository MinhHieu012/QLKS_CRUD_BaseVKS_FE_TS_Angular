import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomService } from '../../../../service/room.service';
import { RoomStatus, RoomTypeForDropdown, RoomUpdate } from '../../../../interface/room.interface';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  constructor(
    private roomService: RoomService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllRoomTypeForDropdown();
    this.roomStatus = [
      { name: 'ACTIVE', code: 'Đang rảnh' },
      { name: 'LOCK',  code: 'Bị khóa' },
      { name: 'CLEANING', code: 'Đang dọn dẹp' },
      { name: 'USING', code: 'Đang sử dụng' }
    ];
  }

  display: boolean = false;
  errorMessage: String = '';
  fieldErrors: any = {};

  roomStatus: RoomStatus[] = [];
  roomType: RoomTypeForDropdown[] = [];

  @Input() roomDataIdFromParent: String = '';
  @Input() roomDataNameFromParent: String = '';
  @Input() roomDataRoomNumberFromParent: String = '';
  @Input() roomDataFloorFromParent: String = '';
  @Input() roomDataRoomTypeIdFromParent: Number = 0;
  @Input() roomDataDescriptionFromParent: String = '';
  @Input() roomDataPriceFromParent: String = '';
  @Input() roomDataStatusFromParent: String = '';
  @Output() callGetRoomBackAfterAddUpdate = new EventEmitter<String>();

  dataRoomSendToUpdate: RoomUpdate = {
    id: 0,
    name: '',
    roomNumber: '',
    floor: '',
    roomTypeId: 0,
    description: '',
    price: '',
    status: ''
  }

  showDialog() {
    this.display = true;
    this.dataRoomSendToUpdate.id = Number(this.roomDataIdFromParent);
    this.dataRoomSendToUpdate.name = this.roomDataNameFromParent;
    this.dataRoomSendToUpdate.roomNumber = this.roomDataRoomNumberFromParent;
    this.dataRoomSendToUpdate.floor = this.roomDataFloorFromParent;
    this.dataRoomSendToUpdate.roomTypeId = this.roomDataRoomTypeIdFromParent;
    this.dataRoomSendToUpdate.description = this.roomDataDescriptionFromParent;
    this.dataRoomSendToUpdate.price = this.roomDataPriceFromParent;
    this.dataRoomSendToUpdate.status = this.roomDataStatusFromParent;
  }

  getAllRoomTypeForDropdown() {
    this.roomService.getAllRoomTypeForDropdown().subscribe((data: any) => {
      this.roomType = data.result;
    })
  }

  handleUpdateRoom() {
    this.roomService.updateRoom(this.dataRoomSendToUpdate).subscribe({
      next: () => {
        this.display = false;
        this.callGetRoomBackAfterAddUpdate.emit();
        this.showUpdateSuccessNotification();
        this.clearModalDataUpdateRoom();
      },
      error: (error: HttpErrorResponse) => {
        if (error.error) {
          this.showUpdateFailedNotification();
          this.fieldErrors = error.error.result;
        } else {
          this.errorMessage = "Lỗi không xác định!";
        }
      }
    })
  }

  clearModalDataUpdateRoom() {
    this.dataRoomSendToUpdate = {
      id: 0,
      name: '',
      roomNumber: '',
      floor: '',
      roomTypeId: 0,
      description: '',
      price: '',
      status: ''
    }
    this.fieldErrors = {};
    this.errorMessage = '';
  }

  showUpdateSuccessNotification() {
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật phòng thành công!' });
  }

  showUpdateFailedNotification() {
    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật phòng thất bại!' });
  }
}
