<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height" >
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-kweet"
            bottom-slots
            v-model="newKweetContent"
            placeholder="What's happening?"
            counter
            maxlength="280"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://wallpaperaccess.com/full/6218386.png" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewKweet"
            :disable="!newKweetContent"
            class="q-mb-lg new-font"
            unelevated
            rounded
            no-caps
            color="primary"
            label="Kweet"
          />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeInDown slow"
          leave-active-class="animated fadeOutTopRight slow"
        >
          <q-item v-for="kweet in kweets" :key="kweet.id" class="q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://wallpaperaccess.com/full/6218386.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="new-font text-subtitle1">
                <strong class="text-orange">Kenneth</strong>
                <span class="text-grey-7">
                  <small>
                    @ken_luong
                    <br class="lt-md" />&bull; {{ kweet.date | relativeDate }}
                  </small>
                </span>
              </q-item-label>
              <q-item-label class="kweet-content text-body2 new-font">
                {{ kweet.content }}
              </q-item-label>
              <div class="kweet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fa-regular fa-comment"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn
                  @click="toggleLiked(kweet)"
                  flat
                  round
                  :color="kweet.liked ? 'pink' : 'grey'"
                  :icon="kweet.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
                  size="sm"
                />
                <q-btn
                  @click="deleteKweet(kweet)"
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { collection, query, onSnapshot, orderBy, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore"
import { formatDistance } from "date-fns"

export default {
  name: "PageHome",
  data() {
    return {
      newKweetContent: "",
      kweets: [
        /*{
          id: 'ID1',
          content: 'butt',
          date: 1658090042005,
          liked: false
        },
        {
          id:'ID2',
          content:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos voluptates, eaque quaerat, architecto eum, est officia sint consequuntur beatae voluptatum magni cupiditate neque reprehenderit voluptate ullam accusamus dicta optio tempore!',
          date: 1658090074520,
          liked: true
        },*/
      ],
    };
  },
  methods: {
      async addNewKweet() {
        let newKweet = {
        content: this.newKweetContent,
        date: Date.now(),
        liked: false
      }
      //this.kweets.unshift(newKweet)
      const docRef = await addDoc(collection(db, 'kweets'), newKweet)
      console.log("Document written with ID: ", docRef.id)
      this.newKweetContent = ''
    },
    async deleteKweet(kweet) {
      await deleteDoc(doc(db, 'kweets', kweet.id))
    },
    async toggleLiked(kweet) {
      await updateDoc(doc(db, 'kweets', kweet.id), {
        liked: !kweet.liked
      });
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
  },
  mounted() {
    const q = query(collection(db, 'kweets'), orderBy('date'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let kweetChange = change.doc.data()
        kweetChange.id = change.doc.id
        if (change.type === 'added') {
          console.log('New kweet: ', kweetChange)
          this.kweets.unshift(kweetChange)
        }
        if (change.type === 'modified') {
          console.log('Modified kweet: ', kweetChange)
          let index = this.kweets.findIndex(kweet => kweet.id === kweetChange.id)
          Object.assign(this.kweets[index], kweetChange)
        }
        if (change.type === 'removed') {
          console.log('Removed kweet: ', kweetChange)
          let index = this.kweets.findIndex(kweet => kweet.id === kweetChange.id)
          this.kweets.splice(index, 1)
        }
      })
    })
  }
}
</script>

<style lang="sass">
.new-kweet
  textarea
    font-size: 19px
    font-family: Consolas,monaco,monospace
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.kweet-content
  white-space: pre-line
.new-font
  font-family: Consolas,monaco,monospace
.kweet-icons
  margin-left: -5px
</style>
