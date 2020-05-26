import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SwUpdate} from '@angular/service-worker';
import {SheltersService} from '../../services/shelters.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    deferredPrompt;
    showButton: boolean = true;

    constructor(private sheltersService: SheltersService, public location: Location, private element: ElementRef, private swUpdate: SwUpdate) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        // Manage frontend application versions
        if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe(() => {
            if (confirm('New version available. Load New Version?')) {
              window.location.reload();
            }
          });
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
        titlee = titlee.slice(1);
      }
      if (titlee === '/home') {
        return true;
      } else {
        return false;
      }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
        titlee = titlee.slice(1);
      }
      if (titlee === '/documentation') {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Event to purpose to the user to install application
     * @param e event received
     */
    @HostListener('window:beforeinstallprompt', ['$event'])
    onbeforeinstallprompt(e) {
      console.log('onbeforeinstallprompt event : ' + JSON.stringify(e));
      this.deferredPrompt = e;
      this.showButton = true;
    }


    /**
     * Propose to the user to install the application
     */
    addToHomeScreen() {
      // hide our user interface that shows our A2HS button
      if (this.deferredPrompt) {
        this.showButton = false;
        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            this.deferredPrompt = undefined;
          });
      } else {
        console.error('The home screen option is not possible');
      }
    }

  displayLoginModal() {
    this.sheltersService.displayModal();
  }
}
