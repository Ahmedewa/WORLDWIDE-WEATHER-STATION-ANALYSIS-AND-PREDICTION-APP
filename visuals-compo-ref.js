       DEFINE VISUALS

### 3. Define Visuals (`visuals.component.ts`)

```ts
export class VisualsComponent {
  visuals = [
    {
      title: 'iPad Pilot News',
      image: 'https://ipadpilotnews.com/wp-content/uploads/2021/09/ipad-mini-cockpit.jpg',
      link: 'https://ipadpilotnews.com/2021/09/pilot-report-flying-with-the-new-ipad-mini-6/'
    },
    {
      title: 'World Economic Forum',
      image: 'https://assets.weforum.org/article/image/large_4zFZz5zqg7qJZKZbZzZz.jpg',
      link: 'https://www.weforum.org/stories/2025/01/global-risks-report-2025-bleak-predictions/'
    },
    {
      title: 'Nature',
      image: 'https://www.nature.com/polopoly_fs/7.12345.1678901234!/image/nature-cover.jpg',
      link: 'https://www.nature.com/'
    },
    {
      title: 'NASA SVS',
      image: 'https://svs.gsfc.nasa.gov/vis/a000000/a005300/a005383/climateSpiral_2023.jpg',
      link: 'https://svs.gsfc.nasa.gov/gallery/the-nasascientific-visualization-studio/'
    },
    {
      title: 's-Ink Warming Stripes',
      image: 'https://s-ink.org/wp-content/uploads/2023/01/warming-stripes-global-1850-2022.png',
      link: 'https://s-ink.org/'
    },
    {
      title: 'UK Climate Resilience',
      image: 'https://www.ukclimateresilience.org/wp-content/uploads/2023/02/infographic.jpg',
      link: 'https://www.ukclimateresilience.org/resources/infographics/'
    },
    {
      title: 'Center for Data Innovation',
      image: 'https://datainnovation.org/wp-content/uploads/2024/11/energy-visualization.jpg',
      link: 'https://datainnovation.org/2024/11/visualizing-energy-consumption-in-america/'
    },
    {
      title: 'Wikimedia Commons',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Climate_Resilience_Model.PNG',
      link: 'https://commons.wikimedia.org/wiki/File:Climate_Resilience_Model.PNG'
    }
  ];
}
```

### 4. Display Visuals (`visuals.component.html`)

```html
<div class="visuals-container">
  <div class="visual-card" *ngFor="let visual of visuals" [@fadeIn]>
    <h3>{{ visual.title }}</h3>
    <a [href]="visual.link" target="_blank">
      <img [src]="visual.image" alt="{{ visual.title }}" />
    </a>
  </div>
</div>
```

### 5. Add Animations (`visuals.component.ts`)

```ts
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
```

### 6. Style the Dashboard (`visuals.component.css`)

```css
.visuals-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.visual-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}
.visual-card:hover {
  transform: scale(1.05);
}
.visual-card img {
  width: 100%;
  height: auto;
}
```

---


## 🎨 1. Visuals to Enhance the Conclusion

## 🧭 Navigation Example (`dashboard.component.html`)

```html
<h2>Welcome to the Climate Dashboard</h2>
<a routerLink="/visuals" class="btn">Explore Visuals</a>
```

---




