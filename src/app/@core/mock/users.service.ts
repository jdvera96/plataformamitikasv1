import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;
  
  private users = {
    profile: { name: '', picture: 'assets/images/Profile.png' },
    profile_log: { name: '', picture: 'assets/images/profileLoged.png' },    
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.profile, type: this.types.mobile },
    { user: this.users.profile_log, type: this.types.home },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.profile, type: this.types.mobile, time: this.time.setHours(5, 29)},
    { user: this.users.profile_log, type: this.types.mobile, time: this.time.setHours(11, 24)},        
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
