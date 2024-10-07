import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class ApisService {

  constructor(private http: HttpClient) {}

  async apiGet(url: string) {
    try {
      const response = await firstValueFrom(this.http.get(url));
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Propagate the error to the caller
    }
  }

  async apiPost(url: string, data: any) {
    try {
      const response = await firstValueFrom(this.http.post(url, data));
      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error; // Propagate the error to the caller
    }
  }

  async apiPatch(url: string, data: any) {
    try {
      const response = await firstValueFrom(this.http.patch(url, data));
      return response;
    } catch (error) {
      console.error('Error patching data:', error);
      throw error; // Propagate the error to the caller
    }
  }



}
