import './Main.css';
import { Component } from 'react';

  class MainPage extends Component{

    componentDidMount(){
      var articles = document.querySelectorAll('.article-container');

      function revealArticle(index) {
        setTimeout(function () {
            articles[index].classList.add('show');
        }, index * 500); // Затримка залежить від індексу, щоб стати по черзі
    }

    for (var i = 0; i < articles.length; i++) {
        revealArticle(i);
    }
    
  }    

  render (){
    return(
    <div>
    <h1>Система Діагностики Якості Життя</h1>
    <div className="main-page">
    <div>
    <article className='article-container left'>
    <p>Наша місія — надавати вам засоби для об'єктивного аналізу, освітлення сильних та слабких сторін та розробки персоналізованих стратегій для досягнення гармонії та щастя.</p>
</article>
<article className='article-container right'>

    <p>В інтерфейсі "Системи Діагностики Якості Життя" використовуються передові технології для збору різноманітних даних, враховуючи фізичне здоров'я, рівень стресу, соціальні взаємини та інші важливі аспекти вашого життя. Наша аналітика не лише надає об'єктивні відомості, але й виокремлює можливості для росту та розвитку.</p>
    </article>
    <article className='article-container left'>

<p>Ми віримо в силу персоналізації, тому кожен користувач отримує індивідуальні рекомендації та інструменти, відповідно до його унікальних потреб та цілей. Незалежно від того, чи ви прагнете покращити фізичне здоров'я, знайти баланс у роботі та особистому житті чи розвивати нові навички, ми тут, щоб вам допомогти.</p>
</article>
<article className='article-container right'>

<p>Приєднуйтеся до нашої спільноти сьогодні та розпочніть свій шлях до більш насиченого, задовільного та здорового життя. "Система Діагностики Якості Життя" — ваш персональний партнер у досягненні найкращої версії себе.</p>
    </article>
    </div>
      <div className='photo'><img src="https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zcGl0YWwlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D" alt="Ілюстрація" /></div>
    
        
        
        
    </div>
    </div>
    )
  }
}


export default MainPage