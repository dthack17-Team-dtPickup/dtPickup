@Pipe({
    name: 'fill'
})
export class FillPipe implements PipeTransform {
    transform(value) {
        return (new Array(value)).fill(1);
    }
}