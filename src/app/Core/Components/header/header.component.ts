import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MenuService } from '../../Services/menu.service';

@Component({
  selector: 'hl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Font Awsome vars.
  faSearch = faSearch;
  faTimes = faTimes;

  isMenuActive: boolean = false;
  isSearchActive: boolean = false;

  @ViewChild("search") searchInput: ElementRef
  @Output() menu = new EventEmitter<boolean>();

  constructor(private menuService: MenuService) { }

  ngOnInit() { }

  get isArrowDisplayed() {
    return this.isMenuActive || this.isSearchActive;
  }

  /**
   * On Search Press.
   */
  onSearch(i: HTMLInputElement) {
    if (!this.isMenuActive) {
      this.toggleMenuStatus();
      this.toggleSearchStatus();
      setTimeout(() => {
        this.searchInput.nativeElement.focus()
      }, 0);
    } else {
      this.search()
    }
  }

  /**
   * On Burger Press.
   */
  onBurger() {
    this.toggleMenuStatus();
    if (this.isSearchActive) {
      this.toggleSearchStatus();
    } else {
      this.menuService.emitMenuStatus(this.isMenuActive);
    }
  }

  /**
   * Clear the search input.
   * @param i The input to clear.
   */
  clear(i: HTMLInputElement) {
    const e = this.searchInput.nativeElement;
    e.value = '';
    e.focus();
  }

  /**
   * Key event from search input.
   * @param event on keyPress
   */
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.search()
    }
  }

  /**
   * Search the Help Center.
   */
  search() {
    // search help center..
    console.log('** proceed to search **')
  }

  /**
   * Toggle the Menu Status. 
   */
  toggleMenuStatus() {
    this.isMenuActive = !this.isMenuActive
  }

  /**
   * Toggle the Search Status. 
   */
  toggleSearchStatus() {
    this.isSearchActive = !this.isSearchActive
  }

}
