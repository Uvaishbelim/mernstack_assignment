import { getItem, setItem } from './storage.js';

class SubmissionViewer {
  constructor() {
    this.data = getItem("guests");
    this.tableBody = document.getElementById("tableBody");
    this.noData = document.getElementById("noData");

    document
      .getElementById("search")
      .addEventListener("input", (e) =>
        this.render(e.target.value)
      );

    this.render();
  }

  render(search = "") {
    this.tableBody.innerHTML = "";

    const filtered = this.data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.checkin.includes(search)
    );

    if (filtered.length === 0) {
      this.noData.innerText = "No data found";
      return;
    }

    this.noData.innerText = "";

    filtered.forEach((item, index) => {
      this.tableBody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${item.checkin}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="viewer.delete(${index})">Delete</button>
          </td>
        </tr>
      `;
    });
  }

  delete(index) {
    this.data.splice(index, 1);
    setItem("guests", this.data);
    this.render();
  }
}

const viewer = new SubmissionViewer();
window.viewer = viewer;