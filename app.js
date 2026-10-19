(() => {
  const data = window.PORTFOLIO_DATA;

  if (!data || !Array.isArray(data.projects)) {
    return;
  }

  const { person, categories, projects } = data;
  const categoryLabels = new Map(categories.map((category) => [category.key, category.label]));
  const categoryKickers = {
    winforms: "WinForms / Desktop",
    services: "Service / Background",
    aspnet: "ASP.NET / Portal",
    web: "Web / Interface",
    lab: "Lab / Experiments"
  };

  const arrowIcon = `
    <svg class="od-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>`;

  const projectGrid = document.getElementById("project-grid");
  const filterList = document.getElementById("filter-list");
  const indexRows = document.getElementById("index-rows");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");
  const resetFilter = document.getElementById("reset-filter");
  const dialog = document.getElementById("project-dialog");
  const dialogShell = dialog ? dialog.querySelector(".project-dialog__shell") : null;
  const dialogClose = document.getElementById("dialog-close");
  const dialogPrev = document.getElementById("dialog-prev");
  const dialogNext = document.getElementById("dialog-next");
  const dialogIndex = document.getElementById("dialog-index");
  const dialogKicker = document.getElementById("dialog-kicker");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogSummary = document.getElementById("dialog-summary");
  const dialogDescription = document.getElementById("dialog-description");
  const dialogHighlights = document.getElementById("dialog-highlights");
  const dialogStack = document.getElementById("dialog-stack");
  const dialogArt = document.getElementById("dialog-art");
  const dialogCategory = document.getElementById("dialog-category");
  const dialogYear = document.getElementById("dialog-year");
  const dialogRole = document.getElementById("dialog-role");
  const copyButton = document.getElementById("copy-email");
  const copyLabel = document.getElementById("copy-label");
  const toast = document.getElementById("toast");
  const toastText = toast ? toast.querySelector("span") : null;

  let currentProjectIndex = 0;
  let lastFocused = null;
  let toastTimer = null;

  const pad = (value) => String(value).padStart(2, "0");

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return entities[character];
    });

  const countFor = (key) =>
    key === "all" ? projects.length : projects.filter((project) => project.category === key).length;

  const filterProjects = (key) =>
    key === "all" ? projects : projects.filter((project) => project.category === key);

  const coverMarkup = (project) => {
    const title = escapeHtml(project.title);
    const kicker = categoryKickers[project.category] || "Selected build";
    let art = "";

    if (project.category === "winforms") {
      art = `
        <div class="wf-shell">
          <div class="wf-bar">
            <span class="wf-dot"></span><span class="wf-dot"></span><span class="wf-dot"></span>
            <span class="wf-bar__title">${title}.exe</span>
          </div>
          <div class="wf-body">
            <div class="wf-nav"><span></span><span></span><span></span><span></span><span></span></div>
            <div class="wf-main">
              <div class="wf-tools"><span></span><span></span><span></span></div>
              <div class="wf-table">
                <div class="wf-th"></div>
                <div class="wf-row"><span></span><span></span><span></span></div>
                <div class="wf-row"><span></span><span></span><span></span></div>
                <div class="wf-row"><span></span><span></span><span></span></div>
                <div class="wf-row"><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
        </div>`;
    }

    if (project.category === "services") {
      art = `
        <div class="svc-shell">
          <div class="svc-head">
            <span class="svc-live"></span>
            <span>${title}.service</span>
            <strong>Running</strong>
          </div>
          <div class="svc-lines">
            <div class="svc-line"><span>01</span><b>worker.ready</b></div>
            <div class="svc-line"><span>02</span><b>queue.connected</b></div>
            <div class="svc-line"><span>03</span><b>batch.received</b></div>
            <div class="svc-line"><span>04</span><b>sync.complete</b></div>
            <div class="svc-line"><span>05</span><b>health.check</b></div>
          </div>
          <svg class="svc-wave" viewBox="0 0 300 42" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 29h24l8-4 8 4h18l7-20 7 32 7-12h28l9-7 9 7h31l6-12 6 22 6-10h23l8-4 8 4h26l6-15 6 25 6-10h28" fill="none" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
          </svg>
        </div>`;
    }

    if (project.category === "aspnet") {
      art = `
        <div class="asp-shell">
          <div class="asp-row">
            <div class="asp-node"><span>01</span><b>Request</b></div>
            <span class="asp-wire"></span>
          </div>
          <div class="asp-row">
            <div class="asp-node asp-node--filled"><span>02</span><b>Route</b></div>
            <span class="asp-wire"></span>
          </div>
          <div class="asp-row">
            <div class="asp-node"><span>03</span><b>Service</b></div>
            <span class="asp-wire"></span>
          </div>
          <div class="asp-row">
            <div class="asp-node asp-node--filled"><span>04</span><b>Response</b></div>
            <span class="asp-wire"></span>
          </div>
        </div>`;
    }

    if (project.category === "web") {
      art = `
        <div class="web-shell">
          <div class="web-bar"><i></i><i></i><i></i><span></span></div>
          <div class="web-view">
            <div class="web-copy"><b></b><b></b><span></span><em></em></div>
            <div class="web-tiles"><span></span><span></span><span></span><span></span></div>
          </div>
        </div>`;
    }

    if (project.category === "lab") {
      art = `
        <div class="lab-shell">
          <div class="lab-head"><span>Experiments / ${escapeHtml(project.number)}</span><span>dotnet</span></div>
          <div class="lab-line"><i>$</i><b>dotnet run</b></div>
          <div class="lab-line"><i>&gt;</i><span>building prototype...</span></div>
          <div class="lab-line"><i>&gt;</i><span>checking the edges...</span></div>
          <div class="lab-line"><i>&gt;</i><b>ready</b><span class="lab-cursor"></span></div>
        </div>`;
    }

    return `
      <div class="cover-art cover-art--${project.category}" aria-hidden="true">
        <span class="cover-art__kicker">${kicker}</span>
        <span class="cover-art__index">${escapeHtml(project.number)}</span>
        ${art}
      </div>`;
  };

  const cardMarkup = (project, index, total) => {
    const label = categoryLabels.get(project.category) || project.category;
    const stack = project.stack.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const cardClass = index === 0 && total !== 2 ? "project-card is-lead" : "project-card";

    return `
      <a class="${cardClass}" href="#project-${escapeHtml(project.id)}" data-project="${escapeHtml(project.id)}" data-category="${escapeHtml(project.category)}" aria-haspopup="dialog">
        <div class="project-card__cover">${coverMarkup(project)}</div>
        <div class="project-card__body">
          <div class="project-card__meta">
            <span class="project-card__type">${escapeHtml(label)}</span>
            <span class="project-card__year">${escapeHtml(project.year)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-card__summary">${escapeHtml(project.summary)}</p>
          <ul class="project-card__stack" aria-label="Stack">${stack}</ul>
          <div class="project-card__foot">
            <span>View project</span>
            ${arrowIcon}
          </div>
        </div>
      </a>`;
  };

  const renderFilters = () => {
    filterList.innerHTML = categories
      .map((category) => {
        const count = countFor(category.key);
        const noun = count === 1 ? "project" : "projects";
        return `
          <button class="filter-button" type="button" data-filter="${escapeHtml(category.key)}" aria-pressed="${category.key === "all"}" aria-label="${escapeHtml(category.label)}, ${count} ${noun}">
            <span>${escapeHtml(category.label)}</span>
            <span class="filter-button__count">${pad(count)}</span>
          </button>`;
      })
      .join("");
  };

  const renderIndex = () => {
    indexRows.innerHTML = categories
      .filter((category) => category.key !== "all")
      .map((category, index) => {
        const count = countFor(category.key);
        const noun = count === 1 ? "project" : "projects";
        return `
          <a class="index-row" href="#work" data-filter-link="${escapeHtml(category.key)}" aria-label="Show ${count} ${escapeHtml(category.label)} ${noun}">
            <span class="index-row__number">${pad(index + 1)}</span>
            <span class="index-row__label">${escapeHtml(category.label)}</span>
            <span class="index-row__count">${pad(count)}</span>
          </a>`;
      })
      .join("");
  };

  const renderProjects = (list) => {
    projectGrid.innerHTML = list.map((project, index) => cardMarkup(project, index, list.length)).join("");
    projectGrid.hidden = list.length === 0;
    emptyState.hidden = list.length !== 0;
    resultCount.textContent = String(list.length);
  };

  const setFilter = (key, options = {}) => {
    const list = filterProjects(key);

    filterList.querySelectorAll(".filter-button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === key));
    });

    renderProjects(list);

    if (options.scroll) {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      document.getElementById("work").scrollIntoView({ behavior, block: "start" });
    }

    if (options.focus) {
      const target = filterList.querySelector(`[data-filter="${key}"]`);
      if (target) {
        window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    }
  };

  const fillDialog = (project) => {
    const label = categoryLabels.get(project.category) || project.category;

    dialogIndex.textContent = `Project / ${project.number}`;
    dialogKicker.textContent = `${label} / Selected build`;
    dialogTitle.textContent = project.title;
    dialogSummary.textContent = project.summary;
    dialogDescription.replaceChildren(
      ...project.description.map((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        return element;
      })
    );
    dialogHighlights.replaceChildren(
      ...project.highlights.map((highlight) => {
        const item = document.createElement("li");
        item.textContent = highlight;
        return item;
      })
    );
    dialogStack.replaceChildren(
      ...project.stack.map((technology) => {
        const item = document.createElement("li");
        item.textContent = technology;
        return item;
      })
    );
    dialogCategory.textContent = label;
    dialogYear.textContent = project.year;
    dialogRole.textContent = project.role;
    dialogArt.innerHTML = coverMarkup(project);
  };

  const openProject = (projectId, trigger) => {
    const index = projects.findIndex((project) => project.id === projectId);
    if (index === -1) {
      return;
    }

    currentProjectIndex = index;
    lastFocused = trigger || document.activeElement;
    fillDialog(projects[index]);

    if (!dialog.open) {
      if (dialogShell) {
        dialogShell.scrollTop = 0;
      }
      dialog.showModal();
      document.body.classList.add("dialog-open");
      window.requestAnimationFrame(() => dialogClose.focus({ preventScroll: true }));
    }
  };

  const stepProject = (direction) => {
    currentProjectIndex = (currentProjectIndex + direction + projects.length) % projects.length;
    fillDialog(projects[currentProjectIndex]);
    if (dialogShell) {
      dialogShell.scrollTop = 0;
    }
  };

  const resetCopyState = () => {
    if (copyButton) {
      copyButton.classList.remove("is-copied");
      copyButton.setAttribute("aria-label", "Copy email address");
    }
    if (copyLabel) {
      copyLabel.textContent = "Copy email";
    }
  };

  const showToast = (message) => {
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add("is-visible");
    }

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      if (toast) {
        toast.classList.remove("is-visible");
      }
    }, 2200);
  };

  const showCopied = () => {
    if (toast && toastText) {
      toastText.textContent = "Email copied";
      toast.classList.add("is-visible");
    }

    if (copyButton) {
      copyButton.classList.add("is-copied");
      copyButton.setAttribute("aria-label", "Email copied to clipboard");
    }

    if (copyLabel) {
      copyLabel.textContent = "Copied";
    }

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      if (toast) {
        toast.classList.remove("is-visible");
      }
      resetCopyState();
    }, 2200);
  };

  const copyWithFallback = (email) => {
    const field = document.createElement("textarea");
    field.value = email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    field.remove();
    return copied;
  };

  document.querySelectorAll("[data-person]").forEach((element) => {
    const key = element.dataset.person;
    if (person[key]) {
      element.textContent = person[key];
    }
  });

  document.querySelectorAll("[data-project-total]").forEach((element) => {
    element.textContent = String(projects.length);
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = person.year;
  });

  document.querySelectorAll("[data-initials]").forEach((element) => {
    element.textContent = person.initials;
  });

  const brand = document.querySelector(".brand");
  if (brand) {
    brand.setAttribute("aria-label", `${person.name} — home`);
  }

  const headerCount = document.querySelector(".header-count");
  if (headerCount) {
    headerCount.setAttribute("aria-label", `View all ${projects.length} projects`);
  }

  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink) {
    emailLink.setAttribute("href", `mailto:${person.email}`);
  }

  const contactMeta = document.querySelector(".contact__meta");
  if (contactMeta) {
    contactMeta.textContent = `Portfolio / ${person.year}`;
  }

  document.title = `${person.name} — Software Portfolio`;

  renderFilters();
  renderIndex();
  setFilter("all");

  filterList.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button) {
      return;
    }
    setFilter(button.dataset.filter);
  });

  indexRows.addEventListener("click", (event) => {
    const link = event.target.closest("[data-filter-link]");
    if (!link) {
      return;
    }
    event.preventDefault();
    setFilter(link.dataset.filterLink, { scroll: true, focus: true });
  });

  if (resetFilter) {
    resetFilter.addEventListener("click", () => setFilter("all"));
  }

  projectGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (!card) {
      return;
    }
    event.preventDefault();
    openProject(card.dataset.project, card);
  });

  if (dialog) {
    const dialogBody = dialog.querySelector(".project-dialog__body");
    if (dialogBody) {
      dialogBody.setAttribute("aria-live", "polite");
    }

    dialogClose.addEventListener("click", () => dialog.close());
    dialogPrev.addEventListener("click", () => stepProject(-1));
    dialogNext.addEventListener("click", () => stepProject(1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus({ preventScroll: true });
      }
    });
  }

  if (copyButton) {
    copyButton.setAttribute("aria-label", "Copy email address");
    copyButton.addEventListener("click", async () => {
      let copied = false;

      try {
        await navigator.clipboard.writeText(person.email);
        copied = true;
      } catch {
        copied = copyWithFallback(person.email);
      }

      if (copied) {
        showCopied();
      } else {
        resetCopyState();
        showToast("Select the email address to copy");
      }
    });
  }
})();
