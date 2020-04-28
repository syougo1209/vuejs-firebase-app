export const input={

data(){
  return{items: [],
  input_material: [],
  }
},
 
 methods:{
 getHitCount() {
                        let count = 0

            for (let i = 0; i < this.items.length; i++) {
                for (let k = 0; k < this.items[i].recipeMaterial.length; k++) {


                    for (let j = 0; j < this.input_material.length; j++) {

                        if (this.input_material[j] === this.items[i].recipeMaterial[k]) { //ここ条件をゆるくしたい
                            count++;
                        }
                    } //ここまでj
                    if (k === this.items[i].recipeMaterial.length - 1) {
                        this.items[i].hitcount = count;
                        count = 0
                    }
                }

            } //ここまでi
        },
 }
}