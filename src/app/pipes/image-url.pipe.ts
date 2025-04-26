import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectURL',
  standalone: true,
})
export class ObjectURLPipe implements PipeTransform {
  private objectURLs: { [key: string]: string } = {};

  transform(file: File): string {
    if (!file) {
      return '';
    }

    const key = `${file.name}-${file.size}-${file.lastModified}`;

    if (!this.objectURLs[key]) {
      this.objectURLs[key] = URL.createObjectURL(file);
    }

    return this.objectURLs[key];
  }

  ngOnDestroy(): void {
    Object.values(this.objectURLs).forEach((url) => URL.revokeObjectURL(url));
  }
}
